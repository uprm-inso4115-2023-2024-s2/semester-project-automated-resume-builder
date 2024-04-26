import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./FAQPage.css";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

function Question({ question, answer }) {
    // Question component
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className="faq-question-container">
            <Button onClick={handleClick} className="question-button" endIcon={<ExpandMoreIcon />}>
                {question}
            </Button>
            <Collapse in={open}>
                <Box>
                    <DialogContent className="expanded-answer">
                        <DialogContentText style={{ fontSize: 24 }}> {answer}</DialogContentText>
                    </DialogContent>
                </Box>
            </Collapse>
        </div >
    );
}

function FAQPage() {
    // FAQ Page with unfolding questions
    const questions = [
        {
            question: "What is UPResuMe?",
            answer:
                "UPResuMe is a web application that helps you create a professional resume with ease. You can choose from a variety of templates, fill in your information, and generate a resume that you can download, save, or share.",
        },
        {
            question: "How do I get started?",
            answer:
                'To get started, click on the "Templates" button in the top menu. Choose a template that you like, fill in your information, and submit your resume. You can then preview your resume, download it as a PDF, save it to your profile, or share it using a link.',
        },
        {
            question: "Can I edit my resume after creating it?",
            answer:
                "Yes, you can edit your resume at any time. Simply go to your profile, select the resume you want to edit, and make the changes you need. You can then preview and download the updated resume.",
        },
        {
            question: "How can I contact support?",
            answer:
                'If you have any questions or need assistance, you can click on the "Help" button in the top menu to access the FAQ page. You can also contact us directly by email at dummy@email.com. We are here to help!',
        }
    ];

    return (
        <Box className="container">
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <div className="all-faq-questions">
                {questions.map((question, index) => (
                    <Question
                        key={index}
                        question={question.question}
                        answer={question.answer}
                    />
                ))}
            </div>
        </Box>
    );
}

export default FAQPage;
