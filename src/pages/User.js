import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const User = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');
        // had to get chatgpt to help me with this part and learning how to use axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = process.env.REACT_APP_GITHUB_TOKEN;
                console.log('GitHub Token:', token);

                const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('User Response:', userResponse.data);
                setUserData(userResponse.data);

                const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Repos Response:', reposResponse.data);
                setRepos(reposResponse.data);
            } catch (err) {
                console.error('Error:', err.response || err.message);
                setError('User not found');
            }
        };

        fetchData();
    }, [username]);

    if (error) {
        return <div className="user-error">{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="user-card">
                <h1>{userData.name}</h1>
                <img src={userData.avatar_url} alt={userData.name} />
                <p>
                    {userData.bio ? userData.bio : 'No bio available.'}
                    <br />
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                        View GitHub Profile
                    </a>
                </p>
                <div className="user-stats">
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Public Repos: {userData.public_repos}</p>
                </div>
            </div>
            <h3 className="repo-title">Repositories</h3>
            <div className="repos-container">
                {repos.map(repo => (
                    <div key={repo.id} className="repo-card">
                        <a href={repo.html_url}>{repo.name}</a>
                        <div className="repo-details">
                            {repo.description && <p className="repo-description">{repo.description}</p>}
                            <p>Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default User;
