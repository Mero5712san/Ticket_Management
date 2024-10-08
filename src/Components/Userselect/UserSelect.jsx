import React, { useEffect, useState } from 'react';
import '../../Styles/UserSelect.css';
import { setGoalUsers } from '../../slice/CreateGoal';
import searchIcon from '../../assets/search.svg';
import profile from '../../assets/profile.png';
import del from '../../assets/delete.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const UserSelect = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userRoles, setUserRoles] = useState([]);

    const dispatch = useDispatch(); // Initialize dispatch

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/master/users');
            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log('error while fetching data', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = users
                .filter(user =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter(user => !selectedUsers.some(selected => selected.id === user.id));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }, [searchTerm, users, selectedUsers]);

    const handleUserSelect = (user) => {
        if (!selectedUsers.some(selectedUser => selectedUser.id === user.id)) {
            setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user]);
            setUserRoles(prevUserRoles => [...prevUserRoles, { id: user.id, name: user.name, owner: false, assignee: false }]);
        }
        setSearchTerm('');
    };

    const handleUserDelete = (userId) => {
        setSelectedUsers(prevSelectedUsers =>
            prevSelectedUsers.filter(user => user.id !== userId)
        );
        setUserRoles(prevUserRoles =>
            prevUserRoles.filter(userRole => userRole.id !== userId)
        );
    };

    const handleRoleChange = (userId, role) => {
        setUserRoles(prevUserRoles =>
            prevUserRoles.map(userRole =>
                userRole.id === userId ? { ...userRole, [role]: !userRole[role] } : userRole
            )
        );
    };

    const handleSave = () => {
        const formattedUsers = userRoles.map(user => ({
            user_id: user.id,
            is_owner: user.owner,
            is_assignee: user.assignee,
            is_active: true,
            path: `/images/user${user.id}.png` // Example of user image path
        }));

        // Dispatch action to update Redux state
        dispatch(setGoalUsers(formattedUsers));
    };




    console.table(userRoles)

    return (
        <div className="userselect">
            <div className="uppercontent">
                <div className="heading">
                    <li>Add Members</li>
                </div>
                <div className="lighttext">
                    <li>search & add members</li>
                </div>
                <div className="search">
                    <li><img src={searchIcon} alt="Search" /></li>
                    <li>
                        <input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </li>
                </div>

                {/* Display search suggestions */}
                {filteredUsers.length > 0 && (
                    <div className="existingmember">
                        {filteredUsers.map(user => (
                            <div className="users" key={user.id}>
                                <div className="user" onClick={() => handleUserSelect(user)}>
                                    <div className="firsthalf">
                                        <li><img src={profile} alt="Profile" /></li>
                                        <li>{user.name}</li>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Display selected users */}
                <div className="existingmember">
                    <div className="lighttext">
                        existing members
                    </div>
                    <div className="users">
                        {selectedUsers.map((user) => (
                            <div key={user.id} className="user">
                                <div className="firsthalf">
                                    <li><img src={profile} alt="Profile" /></li>
                                    <li>{user.name}</li>
                                </div>
                                <div className="secondhalf">
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={userRoles.find(role => role.id === user.id)?.owner || false}
                                            onChange={() => handleRoleChange(user.id, 'owner')}
                                        /> owner
                                    </li>
                                    <li>
                                        <input
                                            type="checkbox"
                                            checked={userRoles.find(role => role.id === user.id)?.assignee || false}
                                            onChange={() => handleRoleChange(user.id, 'assignee')}
                                        /> assignee
                                    </li>
                                    <li>
                                        <img src={del} alt="Delete" onClick={() => handleUserDelete(user.id)} />
                                    </li>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="lowercontent">
                <button className={selectedUsers.length > 0 ? "" : "disabled"} onClick={handleSave}>
                    save
                </button>
            </div>
        </div>
    );
};

export default UserSelect;
