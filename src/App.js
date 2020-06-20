import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'
import {Route} from 'react-router-dom'

class App extends Component {
  state ={
   contacts: [
      
     ],
     
  }
  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  createContact = (contact) =>{
    ContactsAPI.create(contact).then(()=>{
      this.setState((prevState)=>({
        contacts:prevState.contacts.concat([contact])
      }))
    })
  }
  removeContact = (contact)=>{
    this.setState((currentState)=>({
      contacts: currentState.contacts.filter((c)=>{
          return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={()=>(
            <ListContacts contacts={this.state.contacts} 
            onDeleteContact={this.removeContact} />
        )}>

        </Route>

        <Route path='/create' render={({history})=>(
          <CreateContact
          onCreateContact={(contact)=>{
            this.createContact(contact)
            history.push('/')
          }}
          />
        )} />
       

       
      </div>
    );
  }
}

export default App;
