import {
    fireEvent,
    render,
    screen,
    waitFor,
    act,
} from '@testing-library/react';
import LinkPreviewer from '../components/LinkPreviewer';
import mockAxios from 'axios';

describe('LinkPreviewer component', () => {
    it('Should render the textarea box', () => {
        render(<LinkPreviewer />);
        const inputEl = screen.getByLabelText('Input your link');
        expect(inputEl).toBeInTheDocument();
    });

    it('should render title on button click', async () => {
        const mockedResponse = {
            title: 'Great things to do online.',
            description:
                'This is a great thing to do online when you are in the school',
            image: 'https://example.com/hello.png',
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockedResponse })
        );

        render(<LinkPreviewer />);
        const btnElm = screen.getByTestId('readyBtn');
        const textAreaElm = screen.getByTestId('linkInput');
        act(() => {
            fireEvent.change(textAreaElm, {
                target: {
                    value: 'https://www.youtube.com/watch?v=JEwokvSQK4o',
                },
            });
        });

        act(() => {
            fireEvent.click(btnElm);
        });

        await waitFor(() => {
            expect(screen.getByTestId('linkTitle')).toBeInTheDocument();
            expect(screen.getByTestId('linkTitle').innerHTML).toBe(
                mockedResponse.title
            );

            expect(screen.getByTestId('linkDescription').innerHTML).toBe(
                mockedResponse.description
            );
        });
    });

    it('should show error message if received error from server', async () => {
        const message = 'Network Error';
        const promise = Promise.reject(message);
        mockAxios.get.mockImplementationOnce(() => promise);

        render(<LinkPreviewer />);

        const btnElm = screen.getByTestId('readyBtn');
        const textAreaElm = screen.getByTestId('linkInput');
        fireEvent.change(textAreaElm, {
            target: {
                value: 'https://www.youtube.com/watch?v=JEwokvSQK4o',
            },
        });
        fireEvent.click(btnElm);

        await waitFor(() => {
            expect(screen.queryByTestId('linkTitle')).toBeNull();
            expect(screen.getByTestId('errorSpan')).toBeInTheDocument();
        });
    });

    it('should not call server if textarea is empty', () => {
        const message = 'Network Error';
        mockAxios.get.mockRejectedValueOnce(new Error(message));

        render(<LinkPreviewer />);
        const btnElm = screen.getByTestId('readyBtn');
        const textAreaElm = screen.getByTestId('linkInput');
        act(() => {
            fireEvent.change(textAreaElm, {
                target: {
                    value: '',
                },
            });
        });

        act(() => {
            fireEvent.click(btnElm);
        });

        expect(screen.queryByTestId('linkTitle')).not.toBeInTheDocument();
        expect(mockAxios.get).toBeCalledTimes(0);
    });
});
