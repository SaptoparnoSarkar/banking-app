import React from 'react'
import HeaderBox from '@/components/HeaderBox';
import SumBalanceBox from '@/components/SumBalanceBox';
import RightSidebar from '@/components/RightSidebar';

const Dashboard = () => {
  const loggedIn = {firstName: 'Sapto', lastName:'Sarkar', email: 'contact@gmail.com'};
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your transactions efficiently."
          />

          <SumBalanceBox
            accounts = {[]}
            totalBanks = {1}
            totalCurrentBalance ={411250.35}
            />
        </header>

        RECENT TRANSACTIONS
      </div>


      <RightSidebar  
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1234.50},{ currentBalance: 150}]}
      />
    </section>
  );
}

export default Dashboard
