import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import styleIt from '../styleIt';
import Paper from './Paper';

const styles = styleIt(() => ({
  root: {
    display: 'none',
    position: 'fixed',
    zIndex: '1300',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    outline: 'none',
    justifyContent: 'center',
    alignItems: 'center',

    '.ReactModal__Body--open &': {
      display: 'flex',
    },
  },
  content: {},
  overlay: {
    opacity: '0',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    height: '100%',
    outline: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vmax',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  '!.ReactModal__Overlay--after-open': {
    opacity: '1',
  },

  '!.ReactModal__Overlay--before-close': {
    opacity: '0',
  },
  paper: {
    position: 'relative',
    boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  },
}));

type ModalDialogProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  closeButtonText?: string;
  onClose: VoidFunction;
  noPaper: boolean;
  onSubmit?: VoidFunction | undefined;
  autoFocus: boolean;
} & Omit<ReactModal['props'], 'isOpen' | 'onRequestClose' | 'portalClass=Name'>;

function findFirstInput(): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>('[role="dialog"] input');
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function useTransitions(onClose: VoidFunction, autoFocus: boolean, open: boolean) {
  const [focused, setFocused] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [myOpen, setMyOpen] = useState<boolean>(open);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  const closeListener: EventListenerOrEventListenerObject = (e: Event) => {
    const el = e.target as HTMLDivElement;
    if (el?.matches('.ReactModal__Overlay--before-close')) {
      if (open) {
        onClose();
      }
      setMyOpen(false);
    }
  };

  const onFocus = autoFocus ? () => {
    setClosing(false);
    if (!focused) {
      findFirstInput()?.focus();
      setFocused(true);
      const current = overlayRef?.current as HTMLDivElement;
      current?.addEventListener('transitionend', closeListener);
    }
  } : undefined;

  const closeFocus = useCallback(() => {
    setClosing(true);
    if (autoFocus) {
      setFocused(false);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (myOpen && !open) {
      closeFocus();
    } else {
      setMyOpen(open);
    }
  }, [closeFocus, myOpen, open]);

  const afterClose = () => {
    if (overlayRef) {
      overlayRef.current?.removeEventListener('transitionend', closeListener);
    }
  };

  return { onFocus, closeFocus, closing, overlayRef, afterClose, myOpen };
}

function ModalDialog({
  children, open, onClose, autoFocus = false, noPaper = false, ...other
}: ModalDialogProps): JSX.Element {
  const transProps = useTransitions(onClose, autoFocus, open);
  const { closeFocus, onFocus, closing, overlayRef, afterClose, myOpen } = transProps;
  const classes = styles();

  return (
    <ReactModal
      isOpen={myOpen}
      onRequestClose={closeFocus}
      onAfterOpen={autoFocus ? onFocus : undefined}
      portalClassName={classNames(classes.root, 'no-print')}
      appElement={(document.getElementById('root') ?? document.querySelector('body')) as HTMLElement}
      className={classes.content}
      overlayClassName={classNames(
        classes.overlay,
        { 'ReactModal__Overlay--before-close': closing },
      )}
      overlayRef={(node) => {
        if (overlayRef !== null) {
          overlayRef.current = node;
        }
      }}
      onAfterClose={afterClose}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {
        noPaper ? children : (<Paper className={classes.paper}>{children}</Paper>)
      }
    </ReactModal>
  );
}

ModalDialog.defaultProps = {
  closeButtonText: 'Done',
  onSubmit: undefined,
};

export default ModalDialog;


