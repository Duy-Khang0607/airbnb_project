import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";

export default function Modaltest() {
  const { tilte, Component } = useSelector(
    (state: RootState) => state.ModalReducer
  );

  return (
    <>
      <div
        className='modal fade'
        id='modalId'
        tabIndex={-1}
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        role='dialog'
        aria-labelledby='modalTitleId'
        aria-hidden='true'>
        <div
          className='modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='modalTitleId'>
                {tilte}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <Component />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Close
              </button>
              {/* <button type="button" className="btn btn-primary" onClick={submitForm}>
                Submit
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
