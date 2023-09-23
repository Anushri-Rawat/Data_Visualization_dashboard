import React, { useRef } from "react";

const Select = ({ name, data, returnFilter,filter }) => {
  const selectRef = useRef("");

  const handleChange = (e) =>
    name === selectRef.current.value
      ? returnFilter([name, ""])
      : returnFilter([name, selectRef.current.value]);

  return (
    <>
      <select
        ref={selectRef}
        value={filter[name]}
        onChange={handleChange}
        className="form-select form-select-sm p-2 d-inline-block"
        style={{ maxWidth: "200px" }}
      >
        <option value={name}>{name}</option>
        {data &&
          Object.keys(data).map((name, index) => (
            <option key={index}>{name}</option>
          ))}
      </select>
    </>
  );
};

export default Select;
