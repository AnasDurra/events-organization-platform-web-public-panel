import { Typography } from "antd";

const FormWelcomeTitle = ({ title, paragraph }) => {
    return (
        <div>
            <Typography.Title style={{ marginTop: "0px" }} level={2}>
                {title}
            </Typography.Title>
            <Typography.Paragraph
                style={{
                    marginBottom: "2em",
                    fontSize: "13px",
                }}
            >
                {paragraph}
            </Typography.Paragraph>
        </div>
    );
};

export default FormWelcomeTitle;
