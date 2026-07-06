const fs = require('fs');
const path = require('path');

const mdDir = path.join(__dirname, 'scraper', 'features_md');
const backendModelsDir = path.join(__dirname, 'backend', 'models');
const backendRoutesDir = path.join(__dirname, 'backend', 'routes');
const frontendPagesDir = path.join(__dirname, 'frontend', 'src', 'pages');
const serverFile = path.join(__dirname, 'backend', 'server.js');
const appFile = path.join(__dirname, 'frontend', 'src', 'App.jsx');
const modelsIndexFile = path.join(__dirname, 'backend', 'models', 'index.js');

const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));

const skipFiles = ['company.md', 'branch.md', 'departments.md', 'posts.md']; // already done in Phase 1

const toPascalCase = (str) => {
    return str
        .replace(/_([a-z])/g, (g) => g[1].toUpperCase())
        .replace(/^[a-z]/, (g) => g.toUpperCase())
        .replace('.md', '');
};

const toCamelCase = (str) => {
    return str
        .replace(/_([a-z])/g, (g) => g[1].toUpperCase())
        .replace('.md', '');
};

let newModels = [];

files.forEach(file => {
    if (skipFiles.includes(file)) return;
    if (file === 'dashboard.md' || file === 'system_features_index.md') return; // Skip non-CRUD

    const content = fs.readFileSync(path.join(mdDir, file), 'utf-8');
    const inputsMatch = content.match(/### Input Fields([\s\S]*?)(?=### Action Buttons|## Dependencies)/);
    
    let fields = [];
    if (inputsMatch) {
        const regex = /- \*\*(.*?)\*\* \(`(.*?)`, type: (.*?)\)/g;
        let match;
        while ((match = regex.exec(inputsMatch[1])) !== null) {
            let cleanName = match[2].replace(/\[\]/g, '');
            // Check for duplicate field names to avoid React/Sequelize errors
            if (!fields.find(f => f.name === cleanName)) {
                fields.push({ label: match[1], name: cleanName, type: match[3] });
            }
        }
    }

    // If no fields found, it might just be a viewer module, but let's make a basic one anyway.
    if (fields.length === 0) {
        fields = [{ label: 'Name', name: 'name', type: 'text' }];
    }

    const ModelName = toPascalCase(file);
    const varName = toCamelCase(file);
    const apiRoute = file.replace('.md', '').replace(/_/g, '-');

    // 1. Generate Backend Model
    let modelSchema = '';
    fields.forEach(f => {
        let seqType = 'DataTypes.STRING';
        if (f.type === 'date') seqType = 'DataTypes.DATE';
        if (f.type === 'textarea') seqType = 'DataTypes.TEXT';
        modelSchema += `  ${f.name}: { type: ${seqType} },\n`;
    });

    const modelContent = `const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ${ModelName} = sequelize.define('${ModelName}', {
${modelSchema}});

module.exports = ${ModelName};
`;
    fs.writeFileSync(path.join(backendModelsDir, `${ModelName}.js`), modelContent);
    newModels.push(ModelName);

    // 2. Generate Backend Route
    const routeContent = `const express = require('express');
const { ${ModelName} } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await ${ModelName}.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await ${ModelName}.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await ${ModelName}.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    await data.update(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await ${ModelName}.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    await data.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
`;
    fs.writeFileSync(path.join(backendRoutesDir, `${varName}Routes.js`), routeContent);

    // 3. Generate Frontend React Page
    let thHeaders = fields.slice(0, 5).map(f => `            <th>${f.label}</th>`).join('\n');
    let tdCells = fields.slice(0, 5).map(f => `              <td>{item.${f.name} || '-'}</td>`).join('\n');
    
    let initialState = fields.map(f => `${f.name}: ''`).join(', ');
    
    let formGroups = fields.map(f => {
        let inputType = f.type === 'textarea' ? 'as="textarea" rows={3}' : `type="${f.type === 'select' ? 'text' : f.type}"`;
        return `            <Form.Group className="mb-3">
              <Form.Label>${f.label}</Form.Label>
              <Form.Control 
                ${inputType}
                value={formData.${f.name}} 
                onChange={e => setFormData({...formData, ${f.name}: e.target.value})} 
              />
            </Form.Group>`;
    }).join('\n');

    let editMapping = fields.map(f => `${f.name}: item.${f.name} || ''`).join(', ');

    const reactContent = `import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/${apiRoute}';

const ${ModelName} = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ ${initialState} });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) { console.error(err); }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ ${initialState} });
    setEditingId(null);
  };
  
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(\`\${API_URL}/\${editingId}\`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchItems();
      handleClose();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (item) => {
    setFormData({ ${editMapping} });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(\`\${API_URL}/\${id}\`);
        fetchItems();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">${ModelName.replace(/([A-Z])/g, ' $1').trim()} Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
${thHeaders}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
${tdCells}
              <td className="text-end">
                <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => handleEdit(item)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}>
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="${fields.length > 5 ? 7 : fields.length + 2}" className="text-center py-4 text-muted">No records found. Create one!</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Record' : 'Add New Record'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
${formGroups}
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ${ModelName};
`;
    fs.writeFileSync(path.join(frontendPagesDir, `${ModelName}.jsx`), reactContent);
});

// Update models/index.js
let modelsIndex = fs.readFileSync(modelsIndexFile, 'utf-8');
const modelRequires = newModels.map(m => `const ${m} = require('./${m}');`).join('\n');
const modelExports = newModels.join(',\n  ');
modelsIndex = modelsIndex.replace(/const { DataTypes } = require\('sequelize'\);\nconst sequelize = require\('\.\.\/config\/database'\);/, 
`const { DataTypes } = require('sequelize');\nconst sequelize = require('../config/database');\n${modelRequires}`);
modelsIndex = modelsIndex.replace(/module\.exports = {([\s\S]*?)}/, `module.exports = {$1,\n  ${modelExports}\n}`);
fs.writeFileSync(modelsIndexFile, modelsIndex);

// Update server.js
let serverJs = fs.readFileSync(serverFile, 'utf-8');
const routeRequires = newModels.map(m => `const ${toCamelCase(m)}Routes = require('./routes/${toCamelCase(m)}Routes');`).join('\n');
const routeUses = newModels.map(m => `app.use('/api/${m.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}', ${toCamelCase(m)}Routes);`).join('\n');

serverJs = serverJs.replace(/const companyRoutes = require\('\.\/routes\/companyRoutes'\);/, `const companyRoutes = require('./routes/companyRoutes');\n${routeRequires}`);
serverJs = serverJs.replace(/app\.use\('\/api', companyRoutes\);/, `app.use('/api', companyRoutes);\n${routeUses}`);
fs.writeFileSync(serverFile, serverJs);

// Update App.jsx
let appJsx = fs.readFileSync(appFile, 'utf-8');
const pageImports = newModels.map(m => `import ${m} from './pages/${m}';`).join('\n');
appJsx = appJsx.replace(/import Company from '\.\/pages\/Company';/, `import Company from './pages/Company';\n${pageImports}`);

// In App.jsx, I used placeholderRoutes for dynamic routing. Let's explicitly add routes for the new pages.
const builtRouteDefinitions = newModels.map(m => `          <Route path="${m.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}" element={<${m} />} />`).join('\n');
appJsx = appJsx.replace(/<Route path="company" element={<Company \/>} \/>/, `<Route path="company" element={<Company />} />\n${builtRouteDefinitions}`);

fs.writeFileSync(appFile, appJsx);

console.log(`Successfully generated ${newModels.length} full-stack modules!`);
