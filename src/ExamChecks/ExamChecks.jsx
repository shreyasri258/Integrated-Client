import Swal from 'sweetalert2';

export function handleFullScreenWarning(isFullScreen, handleFullscreen) {
    if (!isFullScreen) {
        Swal.fire({
            title: 'Enter Fullscreen',
            text: 'You have to enter fullscreen mode',
            icon: 'info',
            showCancelButton: false,
            confirmButtonText: 'Make FullScreen',
        }).then((result) => {
            if (result.isConfirmed) {
                handleFullscreen();
            }
        });
    }
}

export function handleDevToolsWarning(isDevToolsOpen, warningCnt, disableForm, enableForm, terminateExam) {
    if (!isDevToolsOpen) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: `Your exam will terminate. Please close devtools.Warning count: ${warningCnt}`,
        });
        disableForm();
    } else {
        enableForm();
    }
    terminateExam();
}

export function handleTabSwitchWarning(warningCnt, setWarningCnt, handleFullscreen) {
    setWarningCnt((prevWarningCnt) => prevWarningCnt + 1);
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: `You switched tabs. Please return to the exam.Warning count: ${warningCnt}`,
        showCancelButton: true,
        confirmButtonText: 'Return to Fullscreen',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            handleFullscreen();
        }
    });
}
