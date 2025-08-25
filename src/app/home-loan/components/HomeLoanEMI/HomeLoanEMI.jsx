"use client";
import React from "react";
import styles from "./HomeLoanEMI.module.css";

export default function HomeLoanEMI() {
  return (
    <div className={`${styles.container} container`}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <ul>
          <li className={styles.active}>Home Loan EMI Calculator</li>
          <li>Home Loan Interest Rates</li>
          <li>Home Loan Eligibility</li>
          <li>Document Required</li>
          <li>Home Loan prepayment Calculator</li>
          <li>Home Loan Balance Transfer</li>
          <li>Home Loan processing Fee</li>
          <li>Home Loan Status</li>
          <li>Home Loan Tax Benefits</li>
          <li>Home Loan Types</li>
          <li>Housing Scheme</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        <h1>Home Loan EMI Calculator</h1>
        <p>
          An EMI Calculator or Equated Monthly Installment Calculator is a tool
          which calculates your monthly EMI payments for a Home Loan within a
          few seconds.
        </p>
        <p>
          To use the Home Loan EMI Calculator, all you need to do is enter the
          variables like principal amount, interest rate, tenure, etc. in the
          calculator and it will give you the EMI amount instantly.
        </p>

        <h2>How to Calculate Home Loan EMI Using the Formula?</h2>
        <p>
          The classic way of calculating the EMI is by using the formula stated
          below:
        </p>
        <p className={styles.formula}>
          EMI = [ P x R x (1+R)<sup>n</sup> ] / [ (1+R)<sup>n</sup> - 1 ]
        </p>

        <h2>How to Calculate Home Loan EMI Using the Formula?</h2>
        <ul className={styles['calculater-List']}>
          <li>
            <strong>The variables used here stand for:</strong>
          </li>
          <li>
            <strong>EMI</strong> - Equated Monthly Installments
          </li>
          <li>
            <strong>P</strong> - Principal Amount of the Loan
          </li>
          <li>
            <strong>n</strong> - Tenure of the Loan
          </li>
        </ul>

        <p>
          Let's take an example to understand this clearly. For instance, you
          have taken a Home Loan of Rs 2 Lakh which is to be paid in 2 years at
          an interest rate of 20% per annum.
        </p>
        <p>
          First, convert the yearly interest rate into months. We can obtain the
          monthly interest rate by dividing the yearly interest rate by no. of
          months in a year i.e. 12. So, monthly interest will be 20/12 = 1.66%.
        </p>

        <ul className={styles['formula-List']}>
            <li>
               
                  <strong>Now, put all the variables in the formula:</strong>
                
            </li>
            <li>
                  EMI = [ P x R x (1+R)<sup>n</sup> ] / [ (1+R)<sup>n</sup> - 1 ]
                
            </li>
            <li>
               
                  EMI = [2,00,000 x 1.66/100 x (1+1.66/100)^24] / [(1+1.66/100)^24 - 1]
                
            </li>
            <li>
               EMI = ₹10,177
            </li>
        </ul>

        <p>
          Even, the EMI Calculator uses the same formula to calculate the EMI of
          Home Loan. We also - -recommend calculating the EMI via EMI Calculator
          as it is accurate, requires minimal calculation and can determine the
          EMI within seconds.
        </p>
      </main>
    </div>
  );
}
