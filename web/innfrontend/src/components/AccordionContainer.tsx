import React, { FC } from "react";
import { Accordion } from "semantic-ui-react";
import { Course } from "../store/CourseContext/types";


interface IProps {
    title: string;
    filteredCourses: Array<Course>;
}

const AccordionContainer: FC<IProps> = (props) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <Accordion fluid styled> {props.filteredCourses.map((course: any) => (
            <Accordion.Title>
        {course.category}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
        </Accordion.Content>
        ) }
        </Accordion>
    )
}

export default AccordionContainer;