<template>
  <div class="posts">
    <div class="posts-create-section">
      <h1>Create a new Post!</h1>
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        @click="createPostBtnClick"
      >Create Post</button>
    </div>
    <div class="all-posts">
      <h1>All Posts</h1>

      <div>
        <div class="card" v-for="(item, index) in posts" :key="index">
          <div class="card-header">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary" @click="editPost(index)">Edit</button>
              <button type="button" class="btn btn-danger" @click="deletePost(index)">Delete</button>
            </div>
          </div>
          <div class="card-body">
            <p>
              <strong>Title: {{ item.title }}</strong>
              <br />
              <strong>Description: {{ item.description }}</strong>
            </p>
            <h6>
              <strong>Categories:</strong>
            </h6>
            <ul>
              <li v-for="(item, index) in item.categories" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
              v-if="editablePostId == null"
            >Create a new Post...</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Edit Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                name="title"
                placeholder="Post title"
                class="form-control"
                v-model="postForm.title"
              />
            </div>
            <div class="form-group">
              <textarea
                name="description"
                placeholder="Post description"
                class="form-control"
                rows="3"
                v-model="postForm.description"
              />
            </div>
            <div class="form-group">
              <multiselect
                v-model="value"
                :options="categories"
                multiple
                @select="select"
                label="title"
                track-by="title"
              ></multiselect>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handlePostCreation"
              v-if="editablePostId == null"
            >Create</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handlePostUpdation(editablePostId)"
              v-else
            >Update</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create a new Catagory</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                name="title"
                v-model="catagoryForm.title"
                placeholder="Catagory"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="onCatagoryCreation">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
/* eslint-disable no-undef */
export default {
  components: {
    Multiselect
  },
  data: () => {
    return {
      posts: [],
      value: null,
      categories: [
        {
          title: "Create new"
        }
      ],
      catagoryForm: {
        title: ""
      },
      postForm: {
        title: "",
        description: "",
        catagories: []
      },
      editablePostId: null
    };
  },
  created() {
    this.categories = [
      ...this.categories,
      ...(JSON.parse(localStorage.getItem("cats")) || [])
    ];
    this.posts = JSON.parse(localStorage.getItem("posts"));
  },
  methods: {
    onButtonClick() {
      $("#exampleModal1").modal({
        backdrop: false,
        focus: true,
        show: true
      });
    },
    onCatagoryCreation() {
      this.value = [
        {
          title: this.catagoryForm.title
        }
      ];
      this.categories.push({
        title: this.catagoryForm.title
      });
      const savedCats = JSON.parse(localStorage.getItem("cats")) || [];
      localStorage.setItem(
        "cats",
        JSON.stringify([
          ...savedCats,
          {
            title: this.catagoryForm.title
          }
        ])
      );
      $("#exampleModal1").modal("toggle");
    },
    select(value) {
      if (value.title === "Create new") {
        $("#exampleModal1").modal({
          backdrop: false,
          focus: true,
          show: true
        });
      }
    },
    handlePostCreation() {
      const post = {
        title: this.postForm.title,
        description: this.postForm.description,
        categories: this.value ? this.value.map(item => item.title) : []
      };
      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      localStorage.setItem("posts", JSON.stringify([...savedPosts, post]));
      this.posts = [...(this.posts || []), post];
      $("#exampleModal").modal("toggle");
    },
    createPostBtnClick() {
      this.editablePostId = null;
      this.postForm = {
        title: "",
        description: ""
      };
      this.value = null;
    },
    editPost(id) {
      this.editablePostId = id;
      const post = this.posts[id];
      this.postForm = {
        title: post.title,
        description: post.description
      };
      this.value = post.categories.map(item => ({ title: item }));
      $("#exampleModal").modal("toggle");
    },
    handlePostUpdation(id) {
      const posts = [...this.posts];
      posts[id] = {
        ...this.postForm,
        categories: this.value.map(item => item.title)
      };
      this.posts = posts;
      localStorage.setItem("posts", JSON.stringify(posts));
      $("#exampleModal").modal("toggle");
    },
    deletePost(id) {
      const posts = [...this.posts];
      posts.splice(id, 1);
      this.posts = posts;
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }
};
</script>

<style scoped>
.posts {
  margin-top: 50px;
}
.posts-create-section {
  margin-bottom: 20px;
}
</style>
