import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mjs-tab-panel-${index}`}
      aria-labelledby={`msj-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `msj-tab-${index}`,
    "aria-controls": `mjs-tab-panel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    textTransform: "none",
  },
  tabPanel: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const AppBarHandler = ({ schema }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {schema.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              className={classes.tab}
              icon={tab.icon}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {schema.map((tab) => (
        <TabPanel
          key={tab.index}
          className={classes.tabPanel}
          value={value}
          index={tab.index}
        >
          {tab.panel()}
        </TabPanel>
      ))}
    </div>
  );
};

AppBarHandler.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      index: PropTypes.number.isRequired,
      panel: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default AppBarHandler;
