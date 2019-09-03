import React, {useContext} from 'react';
import {MDBListGroup, MDBListGroupItem} from 'mdbreact';
import {StateContext} from '../context/context';
import Spinner from './Spinner';

/**
 * @return {null}
 */
function ReposList() {
  const {
    reposLinks,
    open,
    listSpinner,
  } = useContext(StateContext);
  const component = (
    <MDBListGroup>
      {reposLinks.map((item, index) => (
        <MDBListGroupItem
          href={item.html_url}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.name}
        </MDBListGroupItem>
      ))}
    </MDBListGroup>
  );
  if (listSpinner) {
    return <Spinner />;
  } if (open && !listSpinner) {
    return component;
  }
  return null;
}

export default ReposList;
