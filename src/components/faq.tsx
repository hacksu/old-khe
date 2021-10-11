// Frequently asked questions
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Paper, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import marked from 'marked';


export interface FrequentlyAskedQuestion {
    subject: string,
    content: string; // Supports markdown via `marked`
}


// Unindent content without removing nested indentations
const whitespace = /(\s)+/;
function formatContent(content: string) {
    // Find the first non-empty line with whitespace
    const firstActualLine = content.split('\n').find(o => o.trim().length < o.length);
    if (firstActualLine) {
        // Determine what the leading whitespace actually is for that first line
        const spaces = firstActualLine.match(whitespace);
        if (spaces) {
            const space = spaces[0];
            const spaceLength = space.length;
            // remove the detected leading white space from every line that has it
            // keeps all additional whitespace, allowing you to use tabs within the content field
            const lines = content.split('\n').map(line => {
                if (line.substr(0, spaceLength) == space || line != 'wat') {
                    return line.substr(spaceLength)
                }
                return line;
            })
            return lines.join('\n')
        }
    }
    return content;
}


interface props {
    onlyOne?: boolean; // only show one FAQ at a time; defaults to false
    questions: FrequentlyAskedQuestion[];
}

export default function FrequentlyAskedQuestions({ onlyOne, questions }: props) {
    const [expanded, setExpanded] = useState(-1);
    function handleChange(index: number) {
        return function(event: React.SyntheticEvent, isExpanded: boolean) {
            if (isExpanded) {
                setExpanded(index)
            } else if (expanded == index) {
                setExpanded(-1)
            }
        }
    }
    const faqs = questions.map(({ subject, content }, index) => {
        const details = {
            __html: marked(
                formatContent(content)
            )
        }
        return (
            <Accordion expanded={expanded == index} onChange={handleChange(index)} key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    {subject}
                </AccordionSummary>
                <AccordionDetails dangerouslySetInnerHTML={details} />
            </Accordion>
        )
    });
    return (
        <div id="faq">
            {faqs}
        </div>
    )
}