import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";

// at least one org has to be selected

export default function OrganizationInput({
  organizations,
  organizationsSelected,
  cbChange,
}) {
  const handleChangeMultiple = (event) => {
    const { value } = event.target;
    cbChange(value);
  };

  const renderValue = (values) => {
    if (organizations.length === values.length)
      return "keine Organisation ausgewählt";

    if (values.length === 0) return "alle";

    return organizations
      .filter((x) => !values.includes(x.id))
      .map((x) => x.name)
      .join(", ");
  };

  return (
    <FormControl>
      <Select
        multiple
        value={organizationsSelected}
        onChange={handleChangeMultiple}
        input={<Input />}
        displayEmpty
        renderValue={renderValue}
      >
        {organizations &&
          organizations.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              <Checkbox checked={!organizationsSelected.includes(x.id)} />
              <ListItemText primary={x.name} secondary={x.region} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
