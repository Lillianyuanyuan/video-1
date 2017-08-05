  (() => {
      let input = document.querySelector('#file');
      file.addEventListener('change', function() {

      });
      let button = document.querySelector('.button');
      button.addEventListener('click', () => {
          if (!input.files[0]) {
              return void alert('选择文件');
          };
          let formdata = new FormData();
          formdata.append(input.files[0].name, input.files[0]);
          let xhr = new XMLHttpRequest();
          xhr.open('post', '/upload', true);
          xhr.upload.onloadstart = () => {
              window.onbeforeunload = (e) => {
                  return void alert('uploading');
              }
          }
          xhr.upload.onprogress = (e) => {
              e = e || window.event;
              let percent = e.loaded / e.total;
          }
          xhr.send(formdata);
      })
  })()