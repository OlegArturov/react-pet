import React, { useState } from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from '@mui/material';

const USERS = [
  { value: 1, label: 'user 1' },
  { value: 2, label: 'user 2' },
  { value: 3, label: 'user 3' },
  { value: 4, label: 'user 4' },
  { value: 5, label: 'user 5' },
];

export default function Dashboard() {
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchPosts = async () => {
    if (!userId) return;
    setLoading(true);
    setPosts([]);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '40px auto', p: 4, boxShadow: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Posts of users (JSONPlaceholder API (v1.0.10))
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>User</InputLabel>
          <Select value={userId} label="User" onChange={(e) => setUserId(e.target.value)}>
            {USERS.map((user) => (
              <MenuItem key={user.value} value={user.value}>
                {user.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchPosts}
          disabled={loading || !userId}
        >
          {loading ? <CircularProgress size={24} /> : 'Show'}
        </Button>
      </Box>

      <List>
        {posts.length === 0 && !loading && (
          <Typography color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            Here will be a list of user's posts after clicking the button
          </Typography>
        )}
        {posts.map((post) => (
          <ListItem key={post.id} sx={{ borderBottom: '1px solid #eee' }}>
            <ListItemText primary={post.title} secondary={post.body} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
