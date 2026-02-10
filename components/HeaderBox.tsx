import React from 'react'

const HeaderBox = ({type="title", title, user, subtext}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title dark:text-vaultflow-white">
        {title}
        {type === "greeting" && (
          <span className="text-bankGradient dark:text-vaultflow-accent dark:shadow-vaultflow-bloom">&nbsp;{user}</span>
        )}
      </h1>
      <p className="header-box-subtext dark:text-vaultflow-white">{subtext}</p>
    </div>
  );
}

export default HeaderBox
