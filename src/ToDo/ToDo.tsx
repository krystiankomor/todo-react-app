import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { v4 as uuidV4 } from 'uuid';

import { IToDoItem } from './IToDoItem';

import 'react-datepicker/dist/react-datepicker.css';

export function ToDo() {
  const LOCAL_STORAGE_KEY = 'todo';

  const emptyModal: IToDoItem = {
    name: '',
    deadline: null,
    done: false,
    id: '',
  };

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [list, setList] = useState<IToDoItem[]>([]);
  const [modalProperties, setModalProperties] = useState<IToDoItem>(emptyModal);
  const [elementIdToDelete, setElementIdToDelete] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  /**
   * Add given item to list
   *
   * @param item List with newly added item
   */
  const addToListAndGet = (item: IToDoItem) => {
    const stateList = list;
    item.id = uuidV4();
    list.push(item);
    setList(stateList);

    return stateList;
  };

  /**
   * Add item from modal to list and save to local storage
   */
  const saveItem = () => {
    const newList = addToListAndGet(modalProperties);
    closeModal();

    saveToLocalStorage(newList);
  };

  /**
   * Close modal of adding a new item
   */
  const closeModal = () => {
    setShowAddModal(false);
    setModalProperties(emptyModal);
  };

  /**
   * Close modal of deletion of item
   */
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setElementIdToDelete('');
  };

  /**
   * Delete selected item and save modified list to local storage
   */
  const deleteItem = () => {
    const modifierList = list.filter((item) => item.id !== elementIdToDelete);
    setList(modifierList);
    closeDeleteModal();

    saveToLocalStorage(modifierList);
  };

  /**
   * Show modal of deletion given item
   *
   * @param item Item to delete
   */
  const showDeleteItem = (item: IToDoItem) => {
    setElementIdToDelete(item.id);
    setShowDeleteModal(true);
  };

  /**
   * Mark item as done and save modified list to local storage
   *
   * @param item Item to mark as done
   */
  const markItemDone = (item: IToDoItem) => {
    const modifiedList = list.map((currentItem) => {
      if (currentItem.id === item.id) {
        currentItem.done = !currentItem.done;
      }

      return currentItem;
    });

    setList(modifiedList);

    saveToLocalStorage(modifiedList);
  };

  /**
   * Save given list of items to local storage
   *
   * @param element Items to save
   */
  const saveToLocalStorage = (element: IToDoItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(element));
  };

  useEffect(() => {
    let listFromLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string).map((item: any) => {
      if (item.deadline) {
        item.deadline = new Date(item.deadline);
      }

      return item;
    });

    setList(listFromLocalStorage || []);
  }, []);

  return (
    <>
      <Card body>
        <p>This is sample TO-DO app. Click <i>Add</i> to add new item to the list.</p>

        <Button variant='success' onClick={() => setShowAddModal(true)}>Add</Button>

        <ListGroup className={'mt-3'}>
          {list
            .map((item) => {
              return (
                <ListGroup.Item>
                  <Row>
                    <Col xs={'auto'} className={'border-end'}><Form.Check
                      type={'checkbox'}
                      id={item.id}
                      checked={item.done}
                      onChange={() => markItemDone(item)}
                    /></Col>
                    <Col xs={10} className={'border-end'}>{item.name} {item.deadline ? <small
                      className={'text-muted'}>by {item.deadline?.toDateString()}</small> : ''}</Col>
                    <Col xs={'auto'}>
                      <Button variant='danger' onClick={() => showDeleteItem(item)}>Delete</Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete TODO item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete that item?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' type={'button'} onClick={closeDeleteModal}>
            No
          </Button>
          <Button variant='danger' type={'button'} onClick={deleteItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={closeModal}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add TODO item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3' controlId='itemName'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder='Enter task name' value={modalProperties.name}
                            onChange={(event) => {
                              let data = { ...modalProperties };
                              data.name = event.target.value;

                              setModalProperties(data);
                            }} />
              <Form.Text className='text-muted'>
                As short as possible
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='itemDeadline'>
              <Form.Label>Deadline</Form.Label>
              <div className={'d-block'}>
                <DatePicker
                  selected={modalProperties?.deadline}
                  onChange={(date) => {
                    let oldData = { ...modalProperties };
                    oldData.deadline = date instanceof Date ? date : null;

                    setModalProperties(oldData);
                  }}
                  dateFormat='yyyy-MM-dd HH:mm'
                  showTimeSelect
                  timeFormat='HH:mm'
                  customInput={<Form.Control type='text' placeholder={'Click to select deadline'} />}
                />
              </div>
            </Form.Group>

            <Form.Group className='mb-3' controlId='itemDone'>
              <Form.Check type='checkbox' label='Mark as done?' checked={modalProperties.done}
                          onChange={() => {
                            let data = { ...modalProperties };
                            data.done = !data.done;

                            setModalProperties(data);
                          }} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' type={'button'} onClick={closeModal}>
              Close
            </Button>
            <Button variant='primary' type={'button'} onClick={saveItem}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
