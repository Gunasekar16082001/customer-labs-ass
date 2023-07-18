import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState([]);

  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];

  const handleSegmentNameChange = (event) => {
    setSegmentName(event.target.value);
  };

  const handleAddSchemaClick = () => {
    setSelectedSchema([...selectedSchema, '']);
  };

  const handleSchemaChange = (index, event) => {
    const updatedSelectedSchema = [...selectedSchema];
    updatedSelectedSchema[index] = event.target.value;
    setSelectedSchema(updatedSelectedSchema);
  };

  const handleRemoveSchemaClick = (index) => {
    const updatedSelectedSchema = [...selectedSchema];
    updatedSelectedSchema.splice(index, 1);
    setSelectedSchema(updatedSelectedSchema);
  };

  const handleSaveSegmentClick = () => {
    if (segmentName.trim() === '') {
      toast.error('Please enter a segment name.');
      return;
    }

    if (selectedSchema.length === 0) {
      toast.error('Please select at least one schema option.');
      return;
    }

    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchema.map((option) => ({
        [option]: option
      }))
    };

    fetch("https://webhook.site/95928484-b3c4-486d-9ace-5e0a1444386f", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(segmentData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle the error if the request fails
        console.error(error);
       
      });

    // Reset state after saving segment
    setSegmentName("");
    setSelectedSchema([]);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <FontAwesomeIcon onClick={closeSidebar} icon={faArrowLeft} />
        <h3>Save Segment</h3>
      </div>
      <div className="sidebar-content">
        <label>
          Enter the Name of the Segment:
          <input type="text" value={segmentName} onChange={handleSegmentNameChange} />
        </label>
        <br />
        <p>To save your segment, you need to add the schemas to build the query.</p>
        {selectedSchema.map((schema, index) => (
          <div className="schema-item" key={index}>
            <select value={schema} onChange={(event) => handleSchemaChange(index, event)}>
              <option value="">Select an option</option>
              {schemaOptions
                .filter((option) => !selectedSchema.includes(option.value))
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              {schema !== '' && (
                <option value={schema} disabled>
                  {schemaOptions.find((option) => option.value === schema)?.label}
                </option>
              )}
            </select>
            <FontAwesomeIcon
              onClick={() => handleRemoveSchemaClick(index)}
              icon={faMinusCircle}
            />
          </div>
        ))}
        <u onClick={handleAddSchemaClick}>Add new schema</u>
        <br />
        <div className="button-group">
          <button className="save-button" onClick={handleSaveSegmentClick}>
            Save the segment
          </button>
          <button className="cancel-button" onClick={closeSidebar}>
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </aside>
  );
};

export default Sidebar;
