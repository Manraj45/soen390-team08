// DEPENDENCIES
import axios from "axios";
import React, { useEffect, useState } from "react";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import { Paper } from "@material-ui/core";
import useStyles from "./InventoryStyles";
import { DataGrid, GridRowsProp, useGridSlotComponentProps } from '@material-ui/data-grid';
import { Pagination } from "@material-ui/lab";

/*
  The inventory page.
  This shows what a logged-in user's inventory contains.
*/
const Inventory = () => {
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/components/`).then((response) => {
      const temp = response.data.map(({
        component_id, component_status, component_type,
        location_name, price, quantity, size, specificComponentType
      }) => {
        return {
          id: component_id,
          component_status: component_status,
          component_type: component_type,
          location_name: location_name,
          price: price,
          quantity: quantity,
          size: size,
          specificComponentType: specificComponentType,
        }
      });
      setInventoryTable(temp);
    });
  }, []);

  const classes = useStyles();

  const CustomPagination = () => {
    const { state, apiRef } = useGridSlotComponentProps();
  
    return (
      <Pagination
        color="primary"
        variant="outlined"
        size="medium"
        page={state.pagination.page + 1}
        count={state.pagination.pageCount}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  return (
    <React.Fragment>
      <div id="inventoryPageTest" className={classes.background}>
        <br/>
        <div className={classes.title}>Inventory</div>
        <br/>
        <Paper className={classes.tableBack}>
            <DataGrid
              rows={inventoryTable as GridRowsProp} 
              columns={[
                { field: 'id' , headerName: 'Id',disableClickEventBubbling: true,type:'number', width: 100},
                { field: 'component_type', headerName: 'Type',disableClickEventBubbling: true, width: 200 },
                { field: 'price', headerName: 'Price',disableClickEventBubbling: true, type: 'number', width: 140 },
                { field: 'quantity', headerName: 'Qty',disableClickEventBubbling: true, type: 'number', width: 140 },
                { field: 'component_status', headerName: 'Status',disableClickEventBubbling: true, width: 200 },
                { field: 'size', headerName: 'Size',disableClickEventBubbling: true, width: 125 },
                { field: 'specificComponentType', headerName: 'Component Type',disableClickEventBubbling: true, width: 200 },
                { field: 'location_name', headerName: 'Location',disableClickEventBubbling: true, width: 200 },
              ]} 
              pageSize={50}
              pagination
              components={{
                Pagination: CustomPagination,
              }}
              className={classes.dataGrid}/>
        </Paper>
      </div> 
    </React.Fragment>
  );
};

export default Inventory;
