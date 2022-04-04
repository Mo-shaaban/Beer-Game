export const COLUMNS = [
    {
        Header: 'Game ID',
        accessor: 'game_ID'
    },
    {
        Header: 'Up Stream Delay',
        accessor: 'upStream_delay'
    },
    {
        Header: 'Down Stream Delay',
        accessor: 'downStream_delay'
    },
    {
        Header: 'Holding Cost',
        accessor: 'holding_cost'
    },
    {
        Header: 'Backorder Cost',
        accessor: 'backlog_cost' // name diff
    },
    {
        Header: 'Weeks Completed',
        accessor: 'weeks_completed'
    },
    {
        Header: 'Total Cost',
        // Sum of all costs - Dynamic
        accessor: 'total_cost'
    },
    {
        Header: 'Factory Cost',
        // Need to add
        accessor: 'factory_cost'
    },
    {
        Header: 'Distributor Cost',
        // Need to add
        accessor: 'distributor_cost'
    },
    {
        Header: 'Wholesaler Cost',
        // Need to add
        accessor: 'wholesaler_cost'
    },
    {
        Header: 'Retailer Cost',
        // Need to add
        accessor: 'retailer_cost'
    },
    {
        Header: 'Graphical Plots'
        // show button
    },
    {
        Header: 'Stop/Continue Game'
        // stop/continue button
    }
]