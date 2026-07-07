import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/department');
        if (isMounted) {
          const names = res.data.map(d => d.dept_name || '').filter(Boolean);
          setDepartments(names);
        }
      } catch (err) {
        console.error('Error fetching departments:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchDepartments();
    return () => {
      isMounted = false;
    };
  }, []);

  return { departments, loading };
};
