import { useState, useEffect } from 'react';
import axios from 'axios';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/employees');
        if (isMounted) {
          const names = res.data.map(emp => 
            `${emp.first_name || ''} ${emp.last_name || ''}`.trim()
          );
          setEmployees(names);
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchEmployees();
    return () => {
      isMounted = false;
    };
  }, []);

  return { employees, loading };
};
