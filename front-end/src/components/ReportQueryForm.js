import React from "react";
import '../styles/Manager.css';

function ReportQueryForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
            <div className="reportquery">
            <label for="start">Start Date:</label><br/>
            <input type="text" id="start" name="start" placeholder="YYYY-MM-DD" className="start"/><br/>
            <br/>
            <label for="end" className="end_date_word">End Date:</label><br/>
            <input type="text" id="end" name="end" placeholder="YYYY-MM-DD" className="end"/><br/>
            <br/>
            <input type="submit" value="Submit" className="submit_bttn_1"></input>
            </div>
        </form>
    );
}

export default ReportQueryForm;