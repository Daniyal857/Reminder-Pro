import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions/index';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: '',
        }
    }

    //addreminders helper method
    addReminder() {
        // console.log('this.state', this.state);
        console.log('this.state.dueDate', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate);
    };

    // deleteReminder helper method
    deleteReminder(id) {
        // console.log('deleting in application', id);
        // console.log('this.props', this.props);
        this.props.deleteReminder(id);
    };

    //renderReminders helper method
    renderReminders() {
        const { reminders } = this.props;
        // console.log('render reminders', reminders);
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{ reminder.text }</div>
                                    <div><em>{moment(new Date(reminder.dueDate)).fromNow() }</em></div>
                                </div>
                                <div
                                    className="list-item delete-button"
                                    onClick={() => this.deleteReminder(reminder.id)}
                                >
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        // console.log('this.props', this.props);
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="i have to..."
                            onChange={e => this.setState({
                                text: e.target.value
                            })}
                        />
                        <input
                            className="form-control"
                            type="datetime-local"
                            onChange={e => this.setState({
                                dueDate: e.target.value
                            })}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addReminder()}
                    >
                        Add Reminder
                    </button>
                </div>
                { this.renderReminders() }
                <div
                    className="btn btn-danger"
                    onClick={() => this.props.clearReminders()}
                >
                    Clear Reminders
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        reminders: state
    }
};

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
