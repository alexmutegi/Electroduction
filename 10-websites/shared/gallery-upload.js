/* Click-to-upload photo boxes.
   Any element with class "photo-box" and a data-photo-key attribute becomes
   clickable: clicking it opens the browser's file picker, and the chosen
   image is shown immediately and saved in this browser's localStorage so it
   reappears next time the page loads. Nothing is uploaded to a server —
   this is a client-side placeholder until real photos/hosting are wired up. */
(function () {
  function applyPhoto(box, dataUrl) {
    var img = box.querySelector('img.photo-uploaded');
    if (!img) {
      img = document.createElement('img');
      img.className = 'photo-uploaded';
      img.alt = '';
      box.appendChild(img);
    }
    img.src = dataUrl;
    box.classList.add('has-photo');
  }

  function loadSavedPhoto(key, box) {
    try {
      var data = localStorage.getItem('photo:' + key);
      if (data) {
        applyPhoto(box, data);
      }
    } catch (e) {
      console.warn('Could not load saved photo for "' + key + '".', e);
    }
  }

  function handleFile(key, box, file) {
    if (!file || file.type.indexOf('image/') !== 0) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      applyPhoto(box, dataUrl);
      try {
        localStorage.setItem('photo:' + key, dataUrl);
      } catch (e) {
        console.warn('Could not save photo for "' + key + '" (it may be too large).', e);
      }
    };
    reader.readAsDataURL(file);
  }

  function init() {
    var boxes = document.querySelectorAll('.photo-box[data-photo-key]');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      var key = box.getAttribute('data-photo-key');
      loadSavedPhoto(key, box);

      var input = box.querySelector('.photo-upload-input');
      if (input && !input.dataset.wired) {
        input.dataset.wired = 'true';
        input.addEventListener('change', function (evt) {
          var target = evt.target;
          var parentBox = target.closest('.photo-box');
          handleFile(parentBox.getAttribute('data-photo-key'), parentBox, target.files[0]);
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.initPhotoUploads = init;
})();
