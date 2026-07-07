import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/branches');
        if (isMounted) {
          setBranches(res.data);
        }
      } catch (err) {
        console.error('Error fetching branches:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchBranches();
    return () => {
      isMounted = false;
    };
  }, []);

  return { branches, loading };
};
