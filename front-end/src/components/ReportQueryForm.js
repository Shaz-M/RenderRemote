import React from "react";

function ReportQueryForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
            <label for="start">Start Date:</label><br/>
            <input type="text" id="start" name="start" placeholder="YYYY-MM-DD"/><br/>
            <label for="end">End Date:</label><br/>
            <input type="text" id="end" name="end" placeholder="YYYY-MM-DD"/><br/>
            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default ReportQueryForm;