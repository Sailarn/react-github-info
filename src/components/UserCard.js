import React, {useContext} from 'react';
import {
  MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBBtn,
} from 'mdbreact';
import moment from 'moment';
import {StateContext} from '../context/context';
import gh from '../util/auth';
import ReposList from './ReposList';
import Spinner from './Spinner';

/**
 * @return {null}
 */
function UserCard() {
  const {
    userInfo,
    inputName,
    setReposLinks,
    setOpenList,
    open,
    cardSpinner,
    setListSpinner,
  } = useContext(StateContext);

  function getRepos() {
    setListSpinner(true);
    const user = gh.getUser(inputName);
    const payload = [];
    user.listRepos()
      .then((repos) => repos.data)
      .then((repos) => {
        if (open) {
          setListSpinner(false);
          setOpenList(false);
        } else {
          setOpenList(true);
          for (let i = 0; i < repos.length; i += 1) {
            payload.push({
              html_url: repos[i].html_url,
              name: repos[i].name,
            });
          }
          setReposLinks(payload);
          setListSpinner(false);
        }
      });
  }

  const component = (
    <MDBCard>
      <MDBCardImage
        className="img-fluid"
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
        src={userInfo.avatar_url}
        waves
      />
      <MDBCardBody>
        <MDBCardTitle>{userInfo.username}</MDBCardTitle>
        <MDBCardText>
          <strong>Bio:</strong>
          {userInfo.bio === null ? 'No information' : userInfo.bio}
        </MDBCardText>
        <MDBCardText>
          <strong>Company:</strong>
          {userInfo.company === null ? 'No information' : userInfo.company}
        </MDBCardText>
        <MDBCardText>
          <strong>Created:</strong>
          {moment(userInfo.created_at)
            .format('dddd, MMMM Do YYYY, h:mm:ss a')}
        </MDBCardText>
        <MDBCardText>
          <strong>Followers:</strong>
          {userInfo.followers}
        </MDBCardText>
        <MDBCardText>
          <strong>Following:</strong>
          {userInfo.following}
        </MDBCardText>
        <MDBCardText>
          <strong>Location:</strong>
          {userInfo.location === null ? 'No information' : userInfo.location}
        </MDBCardText>
        <MDBCardText>
          <strong>Email:</strong>
          {userInfo.email === null ? 'No information' : userInfo.email}
        </MDBCardText>
        <MDBCardText>
          <strong>Url:</strong>
          <a href={userInfo.html_url} target="_blank" rel="noopener noreferrer">Link</a>
        </MDBCardText>
        <MDBCardText>
          <strong>Repos:</strong>
          {userInfo.repos}
        </MDBCardText>
        {userInfo.repos > 0 ? <MDBBtn onClick={getRepos}>See All Repositories</MDBBtn> : null}
        <ReposList />
      </MDBCardBody>
    </MDBCard>
  );
  if (cardSpinner) {
    return <Spinner />;
  }
  if (userInfo.username && !cardSpinner) {
    return component;
  }
  return null;
}

export default UserCard;
