window.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:8000/blog/add-blogs');
    const blogs = response.data.allBlogs;
    for (let i = 0; i < blogs.length; i++) {
      addBlogToList(blogs[i]);
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
}

function addBlogToList(blog) {
  const { id, blogtitle, blogauthor, blogcontent } = blog;

  const liEle = document.getElementById('items');
  const li = document.createElement('li');
  li.style.backgroundColor = "black"; // Set background color to black

  // Blog title with styling
  const titleDiv = document.createElement('div');
  titleDiv.textContent = blogtitle;
  titleDiv.style.color = "white"; // Set text color to white
  titleDiv.style.cursor = "pointer"; // Set cursor to pointer
  titleDiv.style.marginBottom = "10px"; // Add some bottom margin for spacing
  titleDiv.style.fontWeight = "bold"; // Make the title bold
  li.appendChild(titleDiv);

  // Hidden div to contain author name, content, and comments
  const detailsDiv = document.createElement('div');
  detailsDiv.style.display = "none"; // Initially hide details
  detailsDiv.style.color = "white"; // Set text color to white

  // Author name with styling
  const authorSpan = document.createElement('span');
  authorSpan.textContent = "Author: " + blogauthor;
  authorSpan.style.color = "red";
  detailsDiv.appendChild(authorSpan);

  // Content with styling
  const contentPara = document.createElement('p');
  contentPara.textContent = blogcontent;
  contentPara.style.marginLeft = "20px";
  detailsDiv.appendChild(contentPara);

  // Comment feature
  const commentInput = document.createElement('input');
  commentInput.type = "text";
  commentInput.placeholder = "Add your comment here...";
  commentInput.style.marginTop = "10px"; // Add margin to separate from content
  detailsDiv.appendChild(commentInput);

  const commentBtn = document.createElement('button');
  commentBtn.textContent = "Comment";

  commentBtn.addEventListener('click', function () { // Changed from 'onclick' to 'addEventListener'
    console.log(commentBtn);
    const text = commentInput.value.trim();

    // // Dummy values for testing
    // const dummyBlogId = 123; // Replace with a valid blog ID
    // const dummyText = "This is a test comment."; // Replace with the desired comment text
    // const dummyAuthor = "Test User"; // Replace with the desired author name

    if (text) {
      axios.post(`http://localhost:8000/add-comment`, {
        blogId: id,
        text: text,
        blogauthor: "Hazard"// Replace with the actual author name
      })
        .then(response => {
          // Handle successful response (comment added)
          console.log(response);
          alert("Comment added successfully!");

          // Optionally, you can perform additional actions such as updating the UI
          commentInput.value = ''; // Clear the input field after adding the comment
        })
        .catch(error => {
          if (error.response) {
            // Handle error (comment not added)
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            alert("Failed to add comment. Please try again.");
          } else if (error.request) {
            // Handle network error (comment not added)
            console.error(error.request);
            alert("Network error. Please try again.");
          } else {
            // Handle other errors (comment not added)
            console.error('Error:', error.message);
            alert("Failed to add comment. Please try again.");
          }
        });
    } else {
      alert("Please enter a comment.");
    }
  });
  detailsDiv.appendChild(commentBtn);

  li.appendChild(detailsDiv);

  // Append the list item to the parent element
  liEle.appendChild(li);

  // Toggle details visibility on clicking title
  titleDiv.addEventListener('click', function () {
    if (detailsDiv.style.display === "none") {
      detailsDiv.style.display = "block";
    } else {
      detailsDiv.style.display = "none";
    }
  });


  const getAllComments = (id) => {
    // Send a GET request to retrieve all comments for a specific blog ID
    axios.get(`http://localhost:8000/get-all-comments`)
      .then(response => {
        // Handle successful response (comments retrieved)
        const comments = response.data.allComments; // Assuming the server returns all comments
        // Assuming there's an element with id "comments-container" where comments will be displayed
        const commentsContainer = document.getElementById("comments-container");
  
        // Clear existing comments
        commentsContainer.innerHTML = "";
  
        comments.forEach(comment => {
          // Check if the comment belongs to the specified blog ID
          if (comment.blogId === id) {
            // Create elements to display comment information
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
  
            const blogIdParagraph = document.createElement("p");
            blogIdParagraph.textContent = "Blog ID: " + comment.blogId;
  
            const textParagraph = document.createElement("p");
            textParagraph.textContent = "Text: " + comment.text;
  
            const blogAuthorParagraph = document.createElement("p");
            blogAuthorParagraph.textContent = "Blog Author: " + comment.blogauthor;
  
            // Append elements to comment div
            commentDiv.appendChild(blogIdParagraph);
            commentDiv.appendChild(textParagraph);
            commentDiv.appendChild(blogAuthorParagraph);
  
            // Append comment div to comments container
            commentsContainer.appendChild(commentDiv);
          }
        });
      })
      .catch(error => {
        console.error("Error Fetching comments:", error);
        // Handle error (comments not retrieved)
        console.error(error);
        if (error.message) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else {
          console.error('Error:', error.message);
        }
        alert("Failed to retrieve comments. Please try again.");
      });
  };
  
  // Retrieve all comments for a specific blog ID and display them
  const blogId = id ; // Replace 'your_blog_id_here' with the actual blog ID
  getAllComments(blogId);
  






  // // Delete button
  // const btnn = document.createElement('button');
  // btnn.className = "btn btn-danger";
  // btnn.appendChild(document.createTextNode('Delete'));
  // li.appendChild(btnn);

  // li.appendChild(document.createTextNode(" "));

  // // Edit button
  // const edit = document.createElement('button');
  // edit.className = "btn btn-primary";
  // edit.appendChild(document.createTextNode('Edit'));
  // li.appendChild(edit);

  // liEle.appendChild(li);

  // // Remove element function
  // btnn.addEventListener('click', removeBlog);

  // function removeBlog() {

  //   let id = blog.id;

  //   axios.delete('http://localhost:8000/blog/delete-blog/' + `${id}`)
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err))
  //   liEle.removeChild(li);
  // }

  // edit.addEventListener('click', editBlog);

  // function editBlog() {

  //   let id = blog.id;

  //   document.getElementById('blogtitle').value = blogtitle;
  //   document.getElementById('blogauthor').value = blogauthor;
  //   document.getElementById('blogcontent').value = blogcontent;

  //   axios.delete('http://localhost:8000/blog/delete-blog/' + `${id}`)
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err))



  //   liEle.removeChild(li);
  // }
};










