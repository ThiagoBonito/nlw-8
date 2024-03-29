import { SubmitFeedbackUseCase } from "./submit-feedback-use-caso"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const SubmitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
)

describe('Submit feedback', () =>{
    it('should be able to submit a feedback', async () => {
        await expect(SubmitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,1sfasfasfafw21',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit a feedback without type', async () => {
        await expect(SubmitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,1sfasfasfafw21',
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback without comment', async () => {
        await expect(SubmitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,1sfasfasfafw21',
        })).rejects.toThrow();
    })

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(SubmitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    })
})