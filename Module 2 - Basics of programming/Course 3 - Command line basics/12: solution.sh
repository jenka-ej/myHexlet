# Создайте следующую файловую структуру внутри директории fs:

# fs
# ├── example1
# │   ├── file
# │   └── subexample
# │       ├── file
# │       └── directory
# |           └── another_file
# └── example2
#     └── another_file

# playbook.yml

- hosts: all
  gather_facts: no

  tasks:
    - block:
      - file:
          path: "{{ item.path }}"
          state: "{{ item.state }}"
        with_items:
          - { path: fs/example1/subexample/directory, state: directory }
          - { path: fs/example1/subexample/directory/another_file, state: file }
          - { path: fs/example1/subexample/file, state: file }
          - { path: fs/example1/file, state: file }
          - { path: fs/example2/another_file, state: file }
      rescue:
        - fail:
            msg: "You fs is not same as we expected. See README for more details"
