import React from 'react';
import './App.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from 'mdbreact';
import UserCard from './components/UserCard';
import SearchInput from './components/SearchInput';
import StateProvider from './context/stateProvider';

function App() {
  return (
    <StateProvider>
      <MDBContainer className="text-center mt-5 pt-5" fluid>
        <MDBRow center middle>
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="container">
                <SearchInput />
                <UserCard />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </StateProvider>
  );
}

export default App;
