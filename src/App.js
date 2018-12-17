import React, { Component } from 'react';
import './App.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import logo from './Bubble-10s-128x96px.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: '',
        selectedDay: undefined,
        isEmpty: true,
        isDisabled: false,
        showForm: false
    }
  }

  toggleForm = (e) => {
      this.setState(prevState => ({showForm: !prevState.showForm}));
  };

  changeInput = (e) => {
    this.setState({value: e.target.value})
  };

  addItem = e => {
    e.preventDefault();
    let {items,value,selectedDay} = this.state;
    if (value.trim() !== "" && selectedDay!==undefined) {
        this.setState({items: [{value,date:selectedDay},...items],value:'',selectedDay:undefined,showForm:false})
    } else {

    }
  };

  deleteTemp = (index) => (e) => {
      // let {items} = this.state;
      // items.splice(index,1);
      this.setState({deleteIndex:index});
  };

  deleteItem = (index) => (e) => {
    let {items} = this.state;
    items.splice(index,1);
    this.setState({items,deleteIndex:undefined});
  };

  editItem = (index) => (e) => {
      let {items} = this.state;
      let item = items[index];
      item.value = e.target.value;
      this.setState({items});
  };

  handleDayEdit = index => (selectedDay, modifiers, dayPickerInput) => {
      let {items} = this.state;
      let item = items[index];
      item.date = selectedDay;
      this.setState({
          items
      });
  };

    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        this.setState({
            selectedDay,
            isEmpty: !input.value.trim(),
            isDisabled: modifiers.disabled === true,
        });
    };

  render() {
    const {value,items,deleteIndex,selectedDay,showForm} = this.state;
    return (
      <div className="App-header" style={{
          background: `url(${logo})`,
          backgroundSize: 'cover'
      }}>
        <div className="container">
            <div className="bg-gray">
                <div className="text-center text-white mb-3 mt-3 p-3" style={{borderRadius:10,backgroundColor:'rgba(0,0,0,0.8)'}}>
                    <h2>
                        Todo List
                    </h2>
                    <span>Add title and date before adding a to do.</span>
                </div>

                <div className="mt-3 mb-3 btn btn-info" onClick={this.toggleForm}>
                    Add Items
                </div>
                <div>
                    {showForm &&
                    <div className="row">
                        <div className="col-lg-12">
                            <form onSubmit={this.addItem} className="row">
                                <div className="col-7">
                                    <input className="form-control" value={value} onChange={this.changeInput} type="text"/>
                                </div>
                                <div className="col-4">
                                    <DayPickerInput
                                        value={selectedDay}
                                        onDayChange={this.handleDayChange}
                                        dayPickerProps={{
                                            selectedDays: selectedDay,
                                        }} />
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-success" style={{padding:10}}>+ Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    }

                </div>
            </div>

            <div className="container mt-5">
                {items.length === 0 && (
                  <div className="hero">
                      <p className="text-center">No items added yet</p>
                  </div>
                )}
                {
                  items.length > 0 &&
                  <table className="table table-warning rounded">
                      <thead>
                      <tr>
                          <th scope="col">Items</th>
                          <th scope="col">Date</th>
                          <th scope="col">Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {items.map((i,index) => (
                          <tr key={i+':'+index}>
                              <td style={{minWidth:'50%'}}>

                                  <input type="text" value={i.value} onChange={this.editItem(index)} className="form-control"/>
                              </td>
                              <td>
                                  <DayPickerInput
                                      value={i.date}
                                      onDayChange={this.handleDayEdit(index)}
                                      dayPickerProps={{
                                          selectedDays: i.date,
                                      }} />
                              </td>
                            <td>
                                {deleteIndex!==index &&
                                  <button
                                      onClick={this.deleteTemp(index)}
                                      type="button" className="btn btn-danger btn-sm" data-toggle="modal"
                                      data-target="#exampleModalCenter">
                                      Delete
                                  </button>
                                }
                                {deleteIndex === index &&
                                  <button
                                      onClick={this.deleteItem(index)}
                                      type="button" className="btn btn-warning btn-sm" data-toggle="modal"
                                      data-target="#exampleModalCenter">
                                      Confirm
                                  </button>
                                }

                            </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
                }
            </div>

        </div>
      </div>
    );
  }
}

export default App;
