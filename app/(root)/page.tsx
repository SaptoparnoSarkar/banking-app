import React from 'react'
import HeaderBox from '@/components/HeaderBox';
import SumBalanceBox from '@/components/SumBalanceBox';
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser } from '@/lib/server actions/user.actions';

const Dashboard = async() => {

  const loggedIn = await getLoggedInUser();
  
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your transactions efficiently."
          />

          <SumBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={411250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1234.5 }, { currentBalance: 150 }]}
      />
    </section>
  );
}

export default Dashboard
