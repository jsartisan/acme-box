import gql from 'graphql-tag';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation, withApollo } from 'react-apollo';
import { Drawer, Button, Col, Row, Input, message } from 'antd';

import { createFolderValidator } from 'validators/itemValidators';

const GET_ITEMS = parent => gql`
  {
    items(parent: "${parent}") {
    id
    name
    isFile
    parent
    createdAt
  }
}`;

const EDIT_ITEM = gql`
  mutation editItem($name: String!, $id: String!) {
    editItem(name: $name, id: $id) {
      id
      name
      isFile
      parent
      createdAt
    }
  }
`;

class EditItemDrawer extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  /**
   * on submit form
   *
   * @return {[type]} [description]
   */
  onSubmit = (values, editItem) => {
    editItem({ variables: values });
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
    const { onClose, visible, match, item } = this.props;
    const parent = match.params.folder ? match.params.folder : '';

    return (
      <Mutation
        mutation={EDIT_ITEM}
        update={(cache, { data: { editItem } }) => {
          const { items } = cache.readQuery({
            query: GET_ITEMS(parent),
          });

          const index = items.findIndex(item => item._id === editItem._id);
          const copy = items.slice();

          if (index > -1) {
            copy[index] = editItem;
          }

          cache.writeQuery({
            query: GET_ITEMS(item.parent),
            data: { items: copy },
          });

          this.formRef.setSubmitting(false);
          message.success('Item updated successfully');
          onClose();
        }}
        onError={error => {
          console.log(error);
        }}
      >
        {(editItem, { data }) => (
          <Drawer
            title="Edit"
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
                id: item.id,
                name: item.name,
              }}
              onSubmit={values =>
                this.onSubmit(
                  {
                    name: values.name,
                    id: values.id,
                  },
                  editItem
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

export default withRouter(EditItemDrawer);
