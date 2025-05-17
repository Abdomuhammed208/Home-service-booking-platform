{tasker.feedback.map((feedback, index) => (
    <div key={index} className="feedback-item">
        <p className="feedback-text">{feedback.feedback_text}</p>
        <p className="feedback-publisher">Publisher: {feedback.publisher}</p>
    </div>
))} 