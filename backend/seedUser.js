const bcrypt = require('bcryptjs');
const { Users, sequelize } = require('./models');

async function seed() {
  try {
    // Authenticate and sync
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync the models
    await sequelize.sync({ alter: true });
    
    // Check if user already exists
    const count = await Users.count();
    if (count > 0) {
      console.log('Users table already contains records. Skipping seeding.');
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin user
    const admin = await Users.create({
      name: 'Admin User',
      email: 'admin@digitalhr.com',
      username: 'admin',
      password: hashedPassword,
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=696cff&color=fff&size=80'
    });
    
    console.log('Successfully seeded default administrator user:', admin.username);
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

seed();
