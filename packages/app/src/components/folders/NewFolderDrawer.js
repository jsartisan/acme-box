import { Formik } from 'formik';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation, withApollo } from 'react-apollo';
import { Drawer, Button, Col, Row, Input, message } from 'antd';

import { GET_ITEMS, ADD_ITEM } from 'graphql/queries';
import { createFolderValidator } from 'validators/itemValidators';

class NewFolderDrawer extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  /**
   * on submit form
   *
   * @return {[type]} [description]
   */
  onSubmit = (values, addItem) => {
    addItem({ variables: values });
  };

  /**
   * reset form on close
   *
   * @return {[type]} [description]
   */
  onClose = () => {
    const { onClose } = this.props;

    this.formRef.resetForm();
    onClose();
  };

  render() {
    const { onClose, visible, match } = this.props;
    const parent = match.params.folder ? match.params.folder : '';

    return (
      <Mutation
        mutation={ADD_ITEM}
        update={(cache, { data: { addItem } }) => {
          const { items } = cache.readQuery({
            query: GET_ITEMS(parent),
          });

          cache.writeQuery({
            query: GET_ITEMS(parent),
            data: { items: items.concat([addItem]) },
          });

          this.formRef.setSubmitting(false);
          message.success('Folder added successfully');
          onClose();
        }}
        onError={error => {
          message.error('Oops! Something went wrong.');
        }}
      >
        {(addItem, { data }) => (
          <Drawer
            title="Add new folder"
            width={720}
            onClose={this.onClose}
            visible={visible}
            style={{
              overflow: 'auto',
              paddingBottom: '108px',
            }}
          >
            <Formik
              ref={form => {
                this.formRef = form;
              }}
              initialValues={{
                name: '',
              }}
              onSubmit={values =>
                this.onSubmit(
                  {
                    name: values.name,
                    parent: parent,
                    isFile: false,
                  },
                  addItem
                )
              }
              validationSchema={createFolderValidator}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  submitCount,
                  handleSubmit,
                } = props;

                return (
                  <form onSubmit={handleSubmit}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <div className="mt-3">
                              <label>Name</label>
                              <Input
                                name="name"
                                autoFocus
                                size="large"
                                placeholder=""
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-2"
                              />
                              <p className="text-danger">{submitCount > 0 && touched.name && errors.name}</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                      }}
                    >
                      <Button onClick={onClose} size="large">
                        Cancel
                      </Button>
                      <Button
                        htmlType="submit"
                        className="ml-3 o-button--success"
                        type="primary"
                        size="large"
                        loading={isSubmitting}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </Drawer>
        )}
      </Mutation>
    );
  }
}

export default withRouter(withApollo(NewFolderDrawer));
