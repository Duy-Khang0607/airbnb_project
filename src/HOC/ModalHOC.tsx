import React, { ComponentElement } from "react";
import { JsxElement } from "typescript";

type Props = {
  modalId?: string;
  title?: string;
  content?: JSX.Element | JSX.Element[];
};

export default function ModalHOC({ modalId, title, content }: Props) {
  return (
    <div
      className='modal fade modal-xl'
      id={modalId}
      tabIndex={-1}
      role='dialog'
      aria-labelledby='modalTitleId'
      aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='modalTitleId'>
              {title}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            <div className='container-fluid'>{content}</div>
          </div>
          <div className='modal-footer'></div>
        </div>
      </div>
    </div>
  );
}
