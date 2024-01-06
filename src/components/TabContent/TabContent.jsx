import { useState } from 'react';
import { Tab } from '@headlessui/react';
import FeatureRequests from '../FeatureRequests/FeatureRequests';
import DatabaseRequest from '../DatabaseRequest/DatabaseRequest';
import Bugs from '../Bugs/Bugs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TabContent = () => {
  let [categories] = useState({
    Bugs: [],
    'Feature Requests': [],
    'Database Requests': [],
  });

  return (
    <div>
      <div className='w-100 p-10 py-16 bg-secondary'>
        <h2 className='text-2xl  font-bold'>Feedback</h2>
      </div>
      <div className="w-full max-w-md px-2 -mt-12 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-primary p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.entries(categories).map(([category, posts], idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {category === 'Bugs' && <Bugs posts={posts} />}
                {category === 'Feature Requests' && <FeatureRequests posts={posts} />}
                {category === 'Database Requests' && <DatabaseRequest posts={posts} />}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TabContent;
