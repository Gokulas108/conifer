import React from "react";
import { Modal, Row, Col } from "antd";
import moment from "moment";

const expandableRowColumns = {
	projectname: "Project Name",
};

const ViewExpense = ({ record }) => {
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	return (
		<Row>
			{Object.keys(record).map((attr) =>
				attr === "project" || attr === "id" || attr === "username" ? null : (
					<Col span={12}>
						<b>{capitalizeFirstLetter(expandableRowColumns[attr] || attr)}</b> :{" "}
						{attr === "date"
							? moment(record[attr]).format("DD-MM-YYYY")
							: record[attr]}
					</Col>
				)
			)}
		</Row>
	);
};

export default ViewExpense;
