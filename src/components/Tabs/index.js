import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="tw-flex   tw-overflow-hidden tw-relative tw-z-20 tw-border tw-border-[#EFF3A1] tw-rounded-tl-xl  tw-rounded-tr-xl   tw-scroll-container tw-mt-3 tw-productOverflow  tw-whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`sm:tw-px-4 tw-px-3 sm:tw-text-lg tw-text-md  sm:tw-py-4 tw-py-3 ${className} ${
              activeTab === tab.title
                ? "tw-w-full tw-text-black  tw-font-zen-dots   tw-bg-button-gradient "
                : "      tw-text-white tw-font-zen-dots  tw-w-full"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "tw-hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
