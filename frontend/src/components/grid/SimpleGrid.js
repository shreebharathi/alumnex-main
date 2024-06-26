import React, { useMemo } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";

import "./style.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { isEmpty } from "lodash";

const SimpleGrid = (props) => {
	const {
		globalSearch,
		tableFooter,
		tableData,
		tableColumns,
		toolBarItems,
		isLoading = false,
	} = props;

	const columns = useMemo(() => tableColumns, [tableData, tableColumns]);
	const data = useMemo(() => tableData, [tableData, tableColumns]);

	const defaultColumn = useMemo(() => {
		return {
			Filter: ColumnFilter,
		};
	}, []);

	const tableInstance = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		footerGroups,
		state,
		setGlobalFilter,
		page,
		nextPage,
		gotoPage,
		pageCount,
		previousPage,
		canNextPage,
		setPageSize,
		canPreviousPage,
		pageOptions,
	} = tableInstance;

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div className="card pb-4 pt-1">
			{/* Header Start */}
			<div className="py-2 px-1 d-flex flex-row justify-content-between">
				{globalSearch && (
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				)}
				{toolBarItems}
			</div>
			{/* Header End */}
			{!isEmpty(data) && (
				<>
					<div className="table-responsive">
						<table
							className="table table-striped table-bordered table-hover table-md "
							{...getTableProps()}
						>
							<thead>
								{headerGroups.map((headerGroup, index) => (
									<tr {...headerGroup.getHeaderGroupProps} key={index}>
										{headerGroup.headers.map((column, index) => (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps(),
													{
														style: {
															...column.style,
														},
													}
												)}
												className="text-center"
												key={index}
											>
												{column.render("Header")}
												<span className="ml-2">
													{column.isSorted ? (
														column.isSortedDesc ? (
															<i className="fa fa-sort-asc" />
														) : (
															<i className="fa fa-sort-desc" />
														)
													) : (
														<i className="fa fa-sort" />
													)}
												</span>
												{column.canFilter && (
													<div> {column.render("Filter")}</div>
												)}
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()}>
								{page.map((row, index) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()} key={index}>
											{row.cells.map((cell, index) => (
												<td
													key={index}
													className="text-center"
													{...cell.getCellProps({
														style: {
															...cell.column.style,
														},
													})}
												>
													{cell.render("Cell")}
												</td>
											))}
										</tr>
									);
								})}
							</tbody>
							{tableFooter && (
								<tfoot>
									{footerGroups.map((footerGroup) => (
										<tr
											{...footerGroup.getFooterGroupProps()}
											className="text-center"
										>
											{footerGroup.headers.map((column) => (
												<td
													{...column.getFooterProps()}
													className="font-weight-bold fw-bold"
												>
													{column.render("Footer")}
												</td>
											))}
										</tr>
									))}
								</tfoot>
							)}
						</table>
					</div>
					{/* Footer Start */}
					<div className="px-1">
						<div className="d-flex flex-row justify-content-between">
							<div className="d-flex flex-row align-items-center">
								<div style={{ marginRight: "10px" }}>
									Page <strong>{pageIndex + 1}</strong> of{" "}
									<strong>{pageOptions.length} </strong>
								</div>
								<div>
									<select
										className="form-control form-control-sm"
										value={pageSize}
										onChange={(e) => setPageSize(Number(e.target.value))}
									>
										{[10, 20, 50].map((pageSize) => (
											<option key={pageSize} value={pageSize}>
												Show {pageSize}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="d-flex flex-row align-items-center">
								<div style={{ marginRight: "6px" }}> Go to Page:</div>
								<div>
									<input
										className="form-control form-control-sm"
										type="number"
										onChange={(e) => {
											const pageNumber = e.target.value
												? Number(e.target.value) - 1
												: 0;
											gotoPage(pageNumber);
										}}
										value={pageIndex}
										style={{ width: "50px", textAlign: "center" }}
									/>
								</div>
							</div>
							<div className="d-flex flex-row align-items-center">
								<button
									className="btn btn-secondary"
									type="button"
									onClick={() => gotoPage(0)}
									disabled={!canPreviousPage}
								>
									<i className="fa fa-fast-backward"></i>
								</button>
								<button
									type="button"
									className="btn btn-primary ms-2"
									onClick={() => previousPage()}
									disabled={!canPreviousPage}
								>
									Previous
								</button>
								<button
									type="button"
									className="btn btn-primary mx-2"
									onClick={() => nextPage()}
									disabled={!canNextPage}
								>
									Next
								</button>
								<button
									className="btn btn-secondary"
									type="button"
									onClick={() => gotoPage(pageCount - 1)}
									disabled={!canNextPage}
								>
									<i className="fa fa-fast-forward"></i>
								</button>
							</div>
						</div>
					</div>
					{/* Footer End */}
				</>
			)}
			{isEmpty(data) && !isLoading && <h3>No Data Found</h3>}
		</div>
	);
};
export default SimpleGrid;
