const loanAmount = document.getElementById("totalloanamount");
const interestRate = document.getElementById("interestrate");
const loanLength = document.getElementById("loanlength");
const extraPayments = document.getElementById("extraamount");
const tableArea = document.getElementById("table");

function addDivs() {
    
    //clear current table
    function removeDivs() {
        document.getElementById("rowDiv").remove();
    }
    // check if a current table exists - then remove it
    if(document.getElementById("rowDiv")) {
        removeDivs()
    }

    //calculate payment and print to page
    let r = parseFloat(interestRate.value / 12);
    let monthlyPayment = loanAmount.value * r * (1 + r)** loanLength.value / ((1 + r)**loanLength.value - 1);
    monthlyPayment = monthlyPayment.toFixed(2);
    document.getElementById("monthly_payment").innerText = `Monthly Payment: $${monthlyPayment}`;

    const tableRowDiv = document.createElement("div");
    tableRowDiv.id = "rowDiv";
    tableRowDiv.classList.add("row");

    // need to change from test mode
    let monthValue = 1;
    let totalInterest = 0;
    let i = 1;
    function calcRows(m, interest, principle, payment, extra) {
    while(principle > 0){    
        
        //col 1
        let monthColNewId = "m-" + i;
        const monthColumn = document.createElement("div")
        monthColumn.id = monthColNewId;
        monthColumn.classList.add("col-2");

        //col 2
        let intColId = "int-" + i;
        const accruedInterestColumnDiv = document.createElement("div");
        accruedInterestColumnDiv.id = intColId;
        accruedInterestColumnDiv.classList.add("col-2");
    
        //col 3
        let prinColId = "prin-" + i;
        const princBalCol = document.createElement("div")
        princBalCol.id = prinColId;
        princBalCol.classList.add("col-3");
    
        //col 4
        let payDivId = "pay-" + i;
        const payCol = document.createElement("div")
        payCol.id = payDivId;
        payCol.classList.add("col-2");
    
        //col5
        let endBalId = "end-" + i;
        const endBalCol = document.createElement("div")
        endBalCol.id = endBalId;
        endBalCol.classList.add("col-3");

        tableArea.appendChild(tableRowDiv);
        tableRowDiv.appendChild(monthColumn);
        tableRowDiv.appendChild(accruedInterestColumnDiv);
        tableRowDiv.appendChild(princBalCol);
        tableRowDiv.appendChild(payCol);
        tableRowDiv.appendChild(endBalCol);

        // calculate current balance ( principle + interest)
        

        principle = parseFloat(principle);
        let thisMonthsInterest = principle * r;
        principle = principle + thisMonthsInterest;
        princBalCol.innerText = principle.toFixed(2);

        let endingBalance = principle - monthlyPayment - extra;

        totalInterest = parseFloat(totalInterest) + parseFloat(thisMonthsInterest);
        accruedInterestColumnDiv.innerText = totalInterest.toFixed(2);
        
        monthColumn.innerText = m;


        payCol.innerText = payment;

        endBalCol.innerText = endingBalance.toFixed(2);
    
    
    
        principle = endingBalance;
        m++;
        i++
    
        if(m > loanLength.value + 10) {break;}
        }
        document.getElementById("total_interest").innerText = `Total Interest: $${totalInterest.toFixed(2)}`
        document.getElementById("loan_length").innerText = `Total Months: ${m - 1} `;
    }
    calcRows(monthValue, r, loanAmount.value, monthlyPayment, extraPayments.value);
    
}
function addRows() {

}
document.getElementById("button");
button.addEventListener("click", addDivs, false);

