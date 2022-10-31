import React from "react";

const changeHandler = (e, props) => {
  let { value, checked } = e.target;

  let newValue = [...props.value];
  newValue = checked
    ? [...newValue, value]
    : newValue.filter((x) => x !== value);

  props.onChangeFunc(newValue, props.name, e);
};

const OffersCheckbox = (props) => {
  const inputProps = {
    type: "checkbox",
    name: props.name,
    className: props.className,
  };

  return (
    <div className={props.outerClassName}>
      <label className='form-label'>{props.title}</label>
      <div>
        {props.options.map((x, i) => (
          <div
            key={i}
            className={`form-check${
              props.isVertical ? "" : ` form-check-inline`
            }`}
          >
            <input
              {...inputProps}
              id={x.value}
              value={x.value}
              checked={props.value.includes(x.value)}
              onChange={(e) => changeHandler(e, props)}
            />
            <label className='form-check-label' htmlFor={x.value}>
              {x.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

OffersCheckbox.defaultProps = {
  name: "",
  title: "",
  className: "form-check-input",
  outerClassName: "mb-2",
  isVertical: false,
  value: [],
  options: [],
  onChangeFunc: () => {},
  isReq: null,
};

export default OffersCheckbox;
