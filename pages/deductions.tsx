import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { InformationCircleIcon,PlusIcon, ClipboardCheckIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { Tab, Listbox } from '@headlessui/react';

interface FinchEmployee {
  id: string;
  first_name: string;
  last_name: string;
}

interface EnrollData {
  individual_id: string;
  type: 'fixed' | 'percent';
  amount: number;
}

export default function Deductions() {
  // State Hooks
  const [employees, setEmployees] = useState<FinchEmployee[]>();
  const [toggle, setToggle] = useState(2);
  const [arr, setArr] = useState([]);
  const [formData, setFormData] = useState({ type: '', description: '', frequency: '' });
  const [selectedBenefits, setSelectedBenefits] = useState({});
  const [benefitData, setBenefitData] = useState<Record<string, EnrollData>>({});

  // SWR Hook
  const { data, error } = useSWR('/api/finch/directory', { revalidateOnFocus: false });
  
  useEffect(() => {
    setEmployees(data?.individuals);
    getDeductions();
  }, [data]);

  // Constants
  const types = [
    '401k', '401k_roth', '401k_loan', '403b', '403b_roth',
    '457', '457_roth', 's125_medical', 's125_dental', 's125_vision',
    'hsa_pre', 'hsa_post', 'fsa_medical', 'fsa_dependent_care',
    'simple_ira', 'simple', 'commuter', 'custom_post_tax', 
    'custom_pre_tax', 'null'
  ];
  const frequencies = ['one_time', 'every_paycheck', 'null'];

  // Function Declarations
  async function createDeductions(formData: any) {
    await fetch('/api/finch/deductions', {
      method: 'POST',
      headers: {
        'Finch-API-Version': '2020-09-17',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.ok) {
        alert("Benefit Creation Successful");
        return response.json();
      }
      alert("Error: Please check that the type and frequency used are supported by the provider.");
    })
    .then(data => {
      console.log(data);
    });
  }

  async function getDeductions() {
  await fetch('/api/finch/deductions', {
    method: 'GET',
    headers: {
      'Finch-API-Version': '2020-09-17',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
  .then(data => {
    setArr(data);
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching deductions:', error);
  });
}

  // Handler Functions
  const handleInputChange = (name: string, value: string) => { setFormData({
    ...formData,
    [name]: value
  }); };

  const handleBenefitChange = (employeeId: string, key: 'type' | 'amount', value: any) => { setBenefitData(prev => ({
    ...prev,
    [employeeId]: {
      ...prev[employeeId],
      [key]: value,
    },
  })); };

  const handleBenefitSelection = (employeeId: string, selectedBenefit: any) => { setSelectedBenefits(prev => ({
    ...prev,
    [employeeId]: selectedBenefit
  })); };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault();
    createDeductions(formData);
    console.log('Form data submitted:', formData);
    setFormData({type: "", description: "", frequency: ""}); };

    const handleEnrollSubmit = async (event: React.FormEvent<HTMLFormElement>, employeeId: string) => {
      event.preventDefault();
      const selectedBenefit = selectedBenefits[employeeId];
      const benefitId = selectedBenefit ? selectedBenefit.benefit_id : null;
      const enrollmentData = {
        individual_id: employeeId,
        type: benefitData[employeeId]?.type,
        amount: parseInt(benefitData[employeeId]?.amount),
        benefit_id: benefitId,
      };
    
      console.log("Enrollment Data: ", JSON.stringify(enrollmentData));
    
      try {
        const response = await fetch('/api/finch/enroll', {
          method: 'POST',
          headers: {
            'Finch-API-Version': '2020-09-17',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(enrollmentData),
        });
    
        if (!response.ok) {
          throw new Error('Failed to enroll');
        }
    
        await response.json();
        alert("Enrollment Successful");
        console.log('Enrollment successful');
    
        // Clear the type, amount, and benefit name for this employee
        setBenefitData(prev => ({
          ...prev,
          [employeeId]: { ...prev[employeeId], type: '', amount: 0 }
        }));
        setSelectedBenefits(prev => ({
          ...prev,
          [employeeId]: { ...prev[employeeId], description: '', benefit_id: '' }
        }));
    
      } catch (error) {
        console.error('Enrollment error:', error);
      }
    };
    

  if (error) return <div>Error loading data</div>;
  if (!data || !employees) return <div>Loading...</div>;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Finch
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Deductions
          </p>
          <p className="mt-4 mb-16 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Create deductions and enroll individual employees.
            <br></br>
            Learn more about the <a className='text-indigo-600' href="https://developer.tryfinch.com/docs/documentation/sk5k4fx5x9c7m-benefits" target="_blank">deductions</a> API Endpoint.
          </p>
        </div>

        <div className="flex justify-end px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <Tab.Group>
              <Tab.List className="inline-flex rounded-l rounded-r p-1 text-xs">
                <Tab className={`border-l border-t border-b border-indigo-600 py-2 px-4 rounded-l ${toggle !== 2 ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-indigo-600 text-white'}`} onClick={() => setToggle(2)}><PlusIcon className={`inline-flex h-4 w-4 ml-1 mr-2  ${toggle === 1 ? 'hover:text-white' : ''}`} /> Create Deduction</Tab>
                <Tab className={`border-r border-t border-b border-indigo-600 py-2 px-4 rounded-r ${toggle !== 1 ? 'text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-indigo-600 text-white'}`} onClick={() => setToggle(1)}><ClipboardCheckIcon className={`inline-flex h-4 w-4 ml-1 mr-2 ${toggle !== 2 && toggle !== 1 ? 'hover:text-white' : ''}`} /> Enroll Employees</Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        </div>

        {toggle === 1 && (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">First Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Select & Enroll</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Enroll</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee, index) => (
                        <tr className="border-t border-gray-300" key={employee.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.first_name}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{employee?.last_name}</td>
                          <td className="px-3 py-4 text-sm text-gray-900 text-left">
                            <Listbox value={benefitData[employee.id]?.type} onChange={(value) => handleBenefitChange(employee.id, 'type', value)}>
                              <Listbox.Button className="border border-gray-300 rounded-md px-4 py-2"><span className="block truncate">{benefitData[employee.id]?.type || "Select Type "} <ChevronDownIcon className="h-5 float-right" /></span></Listbox.Button>
                              <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <Listbox.Option value="fixed" className="cursor-pointer select-none relative py-2 pl-10 pr-4">
                                  Fixed
                                </Listbox.Option>
                                <Listbox.Option value="percent" className="cursor-pointer select-none relative py-2 pl-10 pr-4">
                                  Percent
                                </Listbox.Option>
                              </Listbox.Options>
                            </Listbox>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md px-4 py-2"
                              value={benefitData[employee.id]?.amount || ''}
                              onChange={(e) => handleBenefitChange(employee.id, 'amount', e.target.value)}
                            />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <form onSubmit={(e) => handleEnrollSubmit(e, employee.id)} className="space-y-4">

                              <Listbox value={selectedBenefits[employee.id]} onChange={(benefit) => handleBenefitSelection(employee.id, benefit)}>
                                <Listbox.Button data-dropdown-toggle="dropdown" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default flex justify-between focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                  <span className="block truncate">{selectedBenefits[employee.id]?.description || "Select a Benefit"}</span>
                                  <ChevronDownIcon className="h-5 w-5" />
                                </Listbox.Button>
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base text-left ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                  {arr.map((benefit) => (
                                    <Listbox.Option key={benefit.benefit_id} value={benefit} className={({ active }) => `cursor-default select-none relative py-2 pl-3 pr-9 ${active ? 'text-white bg-indigo-600' : 'text-gray-900'}`}>
                                      {benefit.description}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Listbox>

                              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Enroll in Benefit
                              </button>

                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
         {toggle === 2 && (
          //<div className="px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
              <Listbox value={formData.type} onChange={(value) => handleInputChange('type', value)}>
                <Listbox.Button data-dropdown-toggle="dropdown" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default flex justify-between focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">{formData.type || "Select a Type"}</span>
                  <ChevronDownIcon className="h-5 w-5" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {types.map((type) => (
                    <Listbox.Option key={type} value={type} className={({ active }) => `cursor-default select-none relative py-2 pl-3 pr-9 ${active ? 'text-white bg-indigo-600' : 'text-gray-900'}`}>
                      {type}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
              <input 
                type="text" 
                id="description" 
                name="description"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                value={formData.description} 
                onChange={(e) => handleInputChange('description', e.target.value)} 
              />
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency:</label>
              <Listbox value={formData.frequency} onChange={(value) => handleInputChange('frequency', value)}>
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default flex justify-between focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">{formData.frequency || "Select a Frequency"}</span>
                  <ChevronDownIcon className="h-5 w-5" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {frequencies.map((frequency) => (
                    <Listbox.Option key={frequency} value={frequency} className={({ active }) => `cursor-default select-none relative py-2 pl-3 pr-9 ${active ? 'text-white bg-indigo-600' : 'text-gray-900'}`}>
                      {frequency}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create Deduction
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
