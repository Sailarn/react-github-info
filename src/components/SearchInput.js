import React, {useContext, useState} from 'react';
import {MDBBtn, MDBInput} from 'mdbreact';
import {StateContext} from '../context/context';
import gh from '../util/auth';

function SearchInput() {
  const {
    setUserInfo, setInputName, setReposLinks, setOpenList, setCardSpinner,
  } = useContext(StateContext);
  const [err, setError] = useState('');
  const [value, setValue] = useState('');

  function getUser() {
    if (value === '') {
      return setError('Enter username');
    }
    setCardSpinner(true);
    setError('');
    const user = gh.getUser(value);

    user.getProfile()
      .then((data) => data.data)
      .then((userData) => {
        setOpenList(false);
        const payload = {
          username: userData.login,
          avatar_url: userData.avatar_url,
          company: userData.company,
          name: userData.name,
          bio: userData.bio,
          created_at: userData.created_at,
          email: userData.email,
          followers: userData.followers,
          following: userData.following,
          repos: userData.public_repos,
          location: userData.location,
          html_url: userData.html_url,
        };
        setUserInfo(payload);
        setInputName(value);
        setReposLinks([]);
        setCardSpinner(false);
      })
      .catch((e) => {
        setError(e.message);
        setUserInfo({});
        setInputName('');
        setCardSpinner(false);
      });
  }

  return (
    <div>
      <MDBInput
        style={{maxWidth: 500}}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        label="Enter github username"
      />
      <MDBBtn onClick={getUser}> Get User </MDBBtn>
      {err ? <p style={{maxWidth: '250px'}}>{err}</p> : null}
    </div>
  );
}

export default SearchInput;
