import React, {useState} from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
} from 'mdbreact';
import moment from 'moment';
import token from './token';
const GitHub = require('github-api');
console.log(token)
const gh = new GitHub({
  token: token.token,
});

function App() {
  const [value, setValue] = useState('');
  const [userInfo, setUserInfo] = useState({
    username: '',
    avatar_url: '',
    company: '',
    name: '',
    bio: '',
    created_at: '',
    location: '',
    email: '',
    followers: 0,
    following: 0,
    repos: 0,
  });

  function getUser() {
    const user = gh.getUser(value);
    user.getProfile((err, repos) => {
      console.log(repos);
      setUserInfo({
        username: repos.login,
        avatar_url: repos.avatar_url,
        company: repos.company,
        name: repos.name,
        bio: repos.bio,
        created_at: repos.created_at,
        email: repos.email,
        followers: repos.followers,
        following: repos.following,
        repos: repos.public_repos,
        location: repos.location,
      });
    });
  }
  function getUserRepos() {
    const user = gh.getUser(value);
    user.listRepos((err, repos) => {
      console.log(repos);
    });
  }
  return (
    <MDBContainer className="text-center mt-5 pt-5" fluid>
      <MDBRow center middle>
        <MDBCol>
          <MDBCard>
            <MDBCardBody style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            >
              <MDBInput
                style={{maxWidth: 500}}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                label="Material input"
              />
              <MDBBtn onClick={getUser}>Get User</MDBBtn>
              <MDBBtn onClick={getUserRepos}>Get User Repos</MDBBtn>
              {userInfo.username
                ? (
                  <MDBCard style={{width: '22rem'}}>
                    <MDBCardImage className="img-fluid" src={userInfo.avatar_url} waves />
                    <MDBCardBody>
                      <MDBCardTitle>{userInfo.username}</MDBCardTitle>
                      <MDBCardText>
                      Bio:
                        {' '}
                        {userInfo.bio}
                      </MDBCardText>
                      <MDBCardText>
                      Company:
                        {' '}
                        {userInfo.company}
                      </MDBCardText>
                      <MDBCardText>
                      Created:
                        {' '}
                        {moment(userInfo.created_at).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                      </MDBCardText>
                      <MDBCardText>
                      Followers:
                        {' '}
                        {userInfo.followers}
                      </MDBCardText>
                      <MDBCardText>
                      Following:
                        {' '}
                        {userInfo.following}
                      </MDBCardText>
                      <MDBCardText>
                      Location:
                        {' '}
                        {userInfo.location}
                      </MDBCardText>
                      <MDBCardText>
                      Email:
                        {' '}
                        {userInfo.email}
                      </MDBCardText>
                      <MDBCardText>
                      Repos:
                        {' '}
                        {userInfo.repos}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                ) : null}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
